import React from "react";
import * as IOIcon from "react-icons/io"

export const SideBar = [
    {
        title:"Alumnos",
        icon:<IOIcon.IoIosAdd />,
        path: "/Students",
        cName: "nav-text"
    },
    {
        title:"Asistencia",
        icon:<IOIcon.IoIosAdd />,
        path: "/StudentsRegister",
        cName: "nav-text"
    },
    {
        title:"Materias",
        icon:<IOIcon.IoIosAdd />,
        path: "/Course",
        cName: "nav-text"
    }
]