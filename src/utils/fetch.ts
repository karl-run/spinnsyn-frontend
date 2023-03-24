import { v4 as uuidv4 } from 'uuid'
import { logger } from '@navikt/next-logger'

import { feilmeldingerUrl } from './environment'

export type FetchResult = { requestId: string; response: Response }

export type ErrorHandler = (result: Response, requestId: string, defaultErrorHandler: () => void) => void

export class FetchError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class AuthenticationError extends Error {}

export const fetchMedRequestId = async (
    url: string,
    options: RequestInit = {},
    errorHandler?: ErrorHandler,
): Promise<FetchResult> => {
    const requestId = uuidv4()

    options.headers = options.headers
        ? { ...options.headers, 'x-request-id': requestId }
        : { 'x-request-id': requestId }

    const fetchUrl = async () => {
        try {
            return await fetch(url, options)
        } catch (e) {
            throw new FetchError(
                `${e} - Kall til url: ${
                    options.method || 'GET'
                } ${url} og x_request_id: ${requestId} feilet uten svar fra backend.`,
                -1,
            )
        }
    }

    const response = await fetchUrl()

    if (response.status == 401) {
        window.location.reload()
        throw new AuthenticationError('Reloader siden på grunn av HTTP-kode 401 fra backend.')
    }

    if (!response.ok) {
        const defaultErrorHandler = () => {
            throw new FetchError(
                `Kall til url: ${options.method} ${url} og x_request_id: ${requestId} feilet med HTTP-kode: ${response.status}.`,
                response.status,
            )
        }
        if (errorHandler) {
            errorHandler(response, requestId, defaultErrorHandler)
        } else {
            defaultErrorHandler()
        }
    }

    return { requestId, response }
}

type Payload = {
    requestId: string
    app: string
    payload: string
    method: string
    responseCode: number
    contentLength: number
}

export const fetchJsonMedRequestId = async (url: string, options: RequestInit = {}, errorHandler?: ErrorHandler) => {
    const fetchResult = await fetchMedRequestId(url, options, errorHandler)
    const response = fetchResult.response
    // Kloner reponse sånn at den kan konsumere flere ganger siden kall til .json() og .text() konsumerer data.
    const clonedResponse = response.clone()

    try {
        return await response.json()
    } catch (e) {
        const payload: Payload = {
            requestId: fetchResult.requestId,
            app: 'spinnsyn-frontend',
            payload: await clonedResponse.text(),
            method: options.method || 'GET',
            responseCode: response.status,
            contentLength: parseInt(response.headers.get('Content-Length') || '0'),
        }

        try {
            await fetch(`${feilmeldingerUrl()}/api/v1/feilmelding`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            logger.info('Sendt payload til flex-frontend-feilmeldinger med x_request_id: ' + fetchResult.requestId)
        } catch (e) {
            logger.error(e, 'Feilet ved sending av payload til backend.')
        }

        throw new FetchError(
            `${e} - Kall til url: ${options.method || 'GET'} ${url} og x_request_id: ${
                fetchResult.requestId
            } feilet ved parsing av JSON med HTTP-kode: ${response.status}.`,
            response.status,
        )
    }
}
