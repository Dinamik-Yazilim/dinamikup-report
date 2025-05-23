
export interface SettingType {
  _id?: string
  connector?: ConnectorType
}

export interface ConnectorType {
  clientId?: string
  clientPass?: string
  connectionType?: 'mssql' | 'mysql' | 'pg' | 'fs' | 'excel' | string | undefined
  mssql?: MsSqlConnectionType
  mysql?: MySqlConnectionType
  pg?: PostgreSqlConnectionType
  fs?: FileSystemConnectionType
  excel?: ExcelConnectionType
}

export interface MsSqlConnectionType {

  user?: string
  password?: string
  database?: string
  server?: string
  port?: number
  dialect?: string
  dialectOptions?: {
    instanceName?: string
  }
  options?: {
    encrypt?: boolean
    trustServerCertificate?: boolean
  },
  mainApp?: string | undefined
}

export interface MySqlConnectionType {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
}

export interface PostgreSqlConnectionType {
  host?: string
  user?: string
  port?: number
  password?: string
  database?: string
}

export interface FileSystemConnectionType {
  filePath?: string
  encoding?: string
}

export interface ExcelConnectionType {
  filePath?: string
}
