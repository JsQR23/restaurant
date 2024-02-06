export interface IPrivilegios {
    administracionUsuario: boolean;
    compras: IAccionPrivilegio;
    entradas: IAccionPrivilegio;
};

export interface IAccionPrivilegio {
    visualizar: boolean;
    editar: boolean;
};