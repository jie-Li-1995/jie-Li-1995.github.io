import { defineConfig } from 'yapi-to-typescript'

export default defineConfig([
  {
    serverUrl: 'http://yapi.ccw.lab/',
    typesOnly: false,
    target: 'typescript',
    reactHooks: {
      enabled: false
    },
    devEnvName: 'dev',
    prodEnvName: 'prod',
    outputFilePath: 'src/testApi/index.ts',
    requestFunctionFilePath: 'src/testApi/request.ts',
    dataKey: 'Data',
    projects: [
      {
        token: 'f6945ed58764ffdaebbc31fe9c186a10f92b7c2f2bea0137ef377d03b0b38d8e',
        categories: [
          {
            id: 0,
            getRequestFunctionName: (interfaceInfo, changeCase) => {
              return (
                changeCase.camelCase(`${interfaceInfo.method}_${interfaceInfo.parsedPath.name}`)
              )
            }
          }
        ]
      }
    ]
  }
])
