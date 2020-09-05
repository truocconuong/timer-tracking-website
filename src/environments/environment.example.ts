// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  apiUrl: 'http://api-vitable.local',
  jwtTokenKey: 'jwt_token_key',
  screenCaptureInterval: 600000,
  saveWorkingTimeInterval: 1000000,
  screenCaptureWith: 1600,
  screenCaptureHeight: 1600,
  defaultScreenCaptureImageType: 'image/png',
  defaultScreenCaptureImageExtension: 'png',
  email : 'admin@vitable.com.au',
  password : 'secret',
  urlCallback : 'http://localhost:9899'
};
