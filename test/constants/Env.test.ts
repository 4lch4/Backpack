import { AxiomVar, AxiomDataset } from '@constants/env'
import { expect, test } from 'bun:test'

test('AxiomConfigVariable.dataset should equal "AXIOM_DATASET"', () => {
  expect(AxiomVar.dataset).toEqual('AXIOM_DATASET')
})

test('AxiomConfigVariable.token should equal "AXIOM_TOKEN"', () => {
  expect(AxiomVar.token).toEqual('AXIOM_TOKEN')
})

test('AxiomConfigVariable.orgId should equal "AXIOM_ORG_ID"', () => {
  expect(AxiomVar.orgId).toEqual('AXIOM_ORG_ID')
})

test('AxiomDataset.Services should equal "services"', () => {
  expect(AxiomDataset.Services).toEqual('services')
})

test('AxiomDataset.NARB should equal "narb-primary"', () => {
  expect(AxiomDataset.NARB).toEqual('narb-primary')
})
