install:
	npm install
install-ci:
	npm ci
lint:
	npx eslint .
test:
	npm t
test-coverage:
	npm test -- --coverage --coverageProvider=v8