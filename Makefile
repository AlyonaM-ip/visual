LIB_TS = ./tc
FILE = lab7

dev:
	@echo "Starting Vite dev server..."
	@cd $(LIB_TS) && npm run dev
build:
	@echo "Building project..."
	@cd $(LIB_TS) && npm run build
test:
	@echo "Running tests for lab7..."
	@cd $(LIB_TS) && npm test -- --run
test-watch:
	@echo "Running tests in watch mode..."
	@cd $(LIB_TS) && npm test
preview:
	@echo "Previewing built project..."
	@cd $(LIB_TS) && npm run preview
all: test build
	@echo "All done"
clean:
	@echo "Cleaning up..."
	@rm -rf $(LIB_TS)/dist
	@rm -rf $(LIB_TS)/node_modules/.vite
	@rm -rf ./test-results
	@echo "Cleaned"
