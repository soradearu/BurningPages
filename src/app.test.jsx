import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders textarea placeholder', () => {
  render(<App />)

  expect(
    screen.getByPlaceholderText(
      /Whatever you write disappear we promise.../i
    )
  ).toBeDefined()
})