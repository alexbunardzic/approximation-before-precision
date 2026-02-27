# Agent Operating Guidelines

## Related Documents
- Architecture.md → System structure & boundaries
- TestingStrategy.md → Testing philosophy & layers

## Project Purpose
This project demonstrates "Approximation Before Precision"
using XP, TDD, mutation testing, and Agentic AI collaboration.

## Technology Stack
- Node.js
- Jest
- Stryker (mutation testing)

## Development Principles
1. Tests define design
2. Always start with a failing test
3. Smallest possible step
4. Minimal implementation
5. Preserve passing tests
7. Mutation score matters

## Constraints
- No speculative features
- In-memory persistence unless required

## Agent Responsibilities
- Prefer minimal implementations
- Never write code without a failing test
- Favor clarity over cleverness
- Refactor only when tests pass

## Definition of Done
- All tests passing
- Mutation score ≥ agreed threshold (ideally 0 survived mutants)
- No duplication
- Intentional naming
