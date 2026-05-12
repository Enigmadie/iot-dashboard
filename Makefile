.PHONY: install dev build preview lint lint-fix format format-check check check-watch verify clean

BUN := bun

install:
	$(BUN) install

dev:
	$(BUN) run dev

build:
	$(BUN) run build

preview:
	$(BUN) run preview

lint:
	$(BUN) run lint

lint-fix:
	$(BUN) run lint:fix

format:
	$(BUN) run format

format-check:
	$(BUN) run format:check

check:
	$(BUN) run check

check-watch:
	$(BUN) run check:watch

verify: format-check lint check build

clean:
	rm -rf .svelte-kit build .output
