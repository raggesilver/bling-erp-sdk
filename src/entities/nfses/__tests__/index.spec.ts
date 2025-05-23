import { Chance } from 'chance'
import { Nfses } from '..'
import { InMemoryBlingRepository } from '../../../repositories/bling-in-memory.repository'
import cancelResponse, { cancelRequest } from './cancel-response'
import createResponse, { createRequestBody } from './create-response'
import deleteResponse from './delete-response'
import findResponse from './find-response'
import getConfigurationsResponse from './get-configurations-response'
import getResponse from './get-response'
import sendResponse from './send-response'
import updateConfigurationsResponse, {
  updateConfigurationsRequestBody
} from './update-configurations-response'
import { IGetResponse } from '../interfaces/get.interface'
import { IFindResponse } from '../interfaces/find.interface'
import { IGetConfigurationsResponse } from '../interfaces/get-configurations.interface'
import { ICreateResponse } from '../interfaces/create.interface'
import { ISendResponse } from '../interfaces/send.interface'

const chance = Chance()

describe('NFS-es entity', () => {
  let repository: InMemoryBlingRepository
  let entity: Nfses

  beforeEach(() => {
    repository = new InMemoryBlingRepository()
    entity = new Nfses(repository)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should delete successfully', async () => {
    const idNotaServico = chance.natural()
    const spy = vi.spyOn(repository, 'destroy')
    repository.setResponse(deleteResponse)

    const response = await entity.delete({ idNotaServico })

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse',
      id: String(idNotaServico)
    })
    expect(response).toBe(deleteResponse)

    const typingResponseTest: null = deleteResponse
    expect(typingResponseTest).toBe(deleteResponse)
  })

  it('should get successfully', async () => {
    const spy = vi.spyOn(repository, 'index')
    repository.setResponse(getResponse)

    const response = await entity.get()

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse',
      params: {
        limite: undefined,
        pagina: undefined,
        situacao: undefined,
        dataEmissaoInicial: undefined,
        dataEmissaoFinal: undefined,
        dataBaseFinal: undefined
      }
    })
    expect(response).toBe(getResponse)

    const typingResponseTest: IGetResponse = getResponse
    expect(typingResponseTest).toBe(getResponse)
  })

  it('should find successfully', async () => {
    const spy = vi.spyOn(repository, 'show')
    const idNotaServico = chance.natural()
    repository.setResponse(findResponse)

    const response = await entity.find({ idNotaServico })

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse',
      id: String(idNotaServico)
    })
    expect(response).toBe(findResponse)

    const typingResponseTest: IFindResponse = findResponse
    expect(typingResponseTest).toBe(findResponse)
  })

  it('should get configurations successfully', async () => {
    const spy = vi.spyOn(repository, 'index')
    repository.setResponse(getConfigurationsResponse)

    const response = await entity.getConfigurations()

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse/configuracoes'
    })
    expect(response).toBe(getConfigurationsResponse)

    const typingResponseTest: IGetConfigurationsResponse =
      getConfigurationsResponse
    expect(typingResponseTest).toBe(getConfigurationsResponse)
  })

  it('should create successfully', async () => {
    const spy = vi.spyOn(repository, 'store')
    repository.setResponse(createResponse)

    const response = await entity.create(createRequestBody)

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse',
      body: createRequestBody
    })
    expect(response).toBe(createResponse)

    const typingResponseTest: ICreateResponse = createResponse
    expect(typingResponseTest).toBe(createResponse)
  })

  it('should send successfully', async () => {
    const spy = vi.spyOn(repository, 'store')
    const idNotaServico = chance.natural()
    repository.setResponse(sendResponse)

    const response = await entity.send({ idNotaServico })

    expect(spy).toHaveBeenCalledWith({
      endpoint: `nfse/${idNotaServico}/enviar`,
      body: {}
    })
    expect(response).toBe(sendResponse)

    const typingResponseTest: ISendResponse = sendResponse
    expect(typingResponseTest).toBe(sendResponse)
  })

  it('should cancel successfully', async () => {
    const spy = vi.spyOn(repository, 'store')
    const idNotaServico = chance.natural()
    repository.setResponse(cancelResponse)

    const response = await entity.cancel({ idNotaServico, ...cancelRequest })

    expect(spy).toHaveBeenCalledWith({
      endpoint: `nfse/${idNotaServico}/cancelar`,
      body: cancelRequest
    })
    expect(response).toBe(cancelResponse)

    const typingResponseTest: null = cancelResponse
    expect(typingResponseTest).toBe(cancelResponse)
  })

  it('should update configurations successfully', async () => {
    const spy = vi.spyOn(repository, 'replace')
    repository.setResponse(updateConfigurationsResponse)

    const response = await entity.updateConfigurations(
      updateConfigurationsRequestBody
    )

    expect(spy).toHaveBeenCalledWith({
      endpoint: 'nfse/configuracoes',
      id: '',
      body: updateConfigurationsRequestBody
    })
    expect(response).toBe(updateConfigurationsResponse)

    const typingResponseTest: null = updateConfigurationsResponse
    expect(typingResponseTest).toBe(updateConfigurationsResponse)
  })
})
