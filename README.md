# Vicoders Angular Admin Kit

- [Vicoders Angular Admin Kit](#vicoders-angular-admin-kit)
  - [Requirement](#requirement)
  - [Installation](#installation)
      - [Create new project with installer](#create-new-project-with-installer)
      - [Install packgages](#install-packgages)
      - [Configuration](#configuration)
  - [Run Development Server](#run-development-server)
    - [Use with docker](#use-with-docker)
  - [Build](#build)
  - [generate component](#generate-component)
    <a name="requirement"></a>

## Requirement

Make sure all dependencies have been installed before moving on

- [Nodejs](https://nodejs.org/en/) >= 8.0.x
- [npm](https://www.npmjs.com/) >= 5.0.x
- [Yarn](https://yarnpkg.com/) >= 0.27.5

<a name="installation"></a>

## Installation

#### Create new project with installer

You can create an empty project by running following command then select the first option

```
vcc create-project --name={project_name}
```

Example

```
vcc create-project --name="angular_admin"
```

#### Install packgages

```shell
yarn install
```

#### Configuration

make `src/environments/environment.ts` file is a copy of `src/environments/environment.example.ts` and update it with your information

<a name="development"></a>

## Run Development Server

By execute the following command, your app will be bootstraped and listen on port 4200

```shell
yarn devstart
```

You can custom application port by run `ng serve` command

```
ng serve --host 0.0.0.0 --env=local --port 4200
```

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

<a name="development-docker"></a>

### Use with docker

If you are runing docker on your machine, you just need to build docker container based on `docker-compose.yaml`

> Make sure you already added `src/environments/environment.ts`

```
docker-compose up --build
```

If it going well you can see your app on [http://localhost:4200](http://localhost:4200)

<a name="build"></a>

## Build

Run `yarn build_prod` to build the project for production. The build artifacts will be stored in the `dist/` directory.

<a name="generate-component"></a>

## generate component

If you want to generate a resource component with api, component and model

```
yarn generate --name={component_name}
```

Sometime you have to generate an empty module for certain purpose

```
yarn generate --name={component_name} --type="empty"
```

Generate child component

```
yarn generate --name={child_component_name} --component="{parent_component}"
```

Exampe: You want to generate an module for admin that can manage user and post

The first we generate empty admin module

```
yarn generate --name=admin --type=empty
```

Next, we generate user module

It will create

- user component inside `src/app/components/admin` directory.
- user service inside `src/app/api` directory.
- User.ts inside `src/app/models` directory.

```
yarn generate --name=user --component=admin
```

If you want to set special path for api service, you can use --apifolderpath option

- user service inside `src/app/api/admin` directory.

> Please make sure you have `admin.module.ts` that declare and API module inside `src/app/api/admin` directory

```
yarn generate --name=user --component=admin --apifolderpath=admin
```

Generate some part of a component

> Each component has 3 parts `api`, `model` and `component`, by default --with="api,model,component"

```
yarn generate --name={child_component_name} --component="{parent_component}" --with="component"
```
