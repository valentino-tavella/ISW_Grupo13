# ISW_Grupo13
Repositorio del grupo 13 de la materia Ingenieria y Calidad de Software UTN

---

##  Índice
1. [Integrantes](#integrantes)  
2. [Estructura del repositorio](#estructura-del-repositorio)  
3. [Reglas de nombrado](#reglas-de-nombrado)  
   - [Tabla de nombrado](#tabla-de-nombrado)  
4. [Criterio de Línea Base](#criterio-de-linea-base)  
5. [Nomenclatura de Línea Base](#nomenclatura-de-linea-base)
6. [Nombramiento de Commits](#criterio-de-nombramiento-de-commits)  
7. [Glosario](#glosario)  
8. [Otros](#otros)  

---

##  Integrantes

- Demaria Alexis – 95754
- Di Vincenzo Franca – 95399   
- Martos Leonel Agustín – 94297  
- Nieto Federico - 79542  
- Pavon Martini Agustín – 94494  
- Revol Lisandro - 66456
- Serafini Augusto – 94373  
- Tavella Valentino – 78973
- Valverde Segura Fabrizio – 96061   

---

## Estructura del Repositorio

```
ISW_Grupo13
|
├── ISW_G13_BIBLIOGRAFIA
├── ISW_G13_MATERIAL_CLASE
│   ├── PRESENTACIONES
│   ├── PRACTICAS
│   └── RESUMENES
├── ISW_G13_TPs
│   ├── TIGs
│   └── PRACTICOS
└── ISW_G13_CODFUENTE
```

---

## Reglas de nombrado

**Formato general:**

- `ISW_G13_<Prefijo>_<NombreDelArchivo>.<ExtensionDelArchivo>`

- `<Prefijo>` → Indicador del tipo de Ítem de Configuración.

- `<NombreDelArchivo>` → Breve descripción o título del archivo.  

- `<ExtensionDelArchivo>` → Extensión del tipo de archivo.  

---

## Tabla de nombrado

| Ítem de configuración       | Regla de nombrado                   | Ubicación Física     |
|------------------------------|--------------------------------------|----------------------|
| **Bibliografía**             | `ISW_G13_BIBLIOGRAFIA_<NombreArchivo>.<ext>`| `/ISW_G13_BIBLIOGRAFIA`      |
| **Código Fuente**            | `ISW_G13_CODFUENTE_<NombreArchivo>.<ext>`| `/ISW_G13_CODFUENTE`         |
| **Material de Clase**            | `ISW_G13_MATCLASE_<NombreArchivo>.<ext>`| `/ISW_G13_MATERIAL_CLASE`     |
| **Presentaciones**   | `ISW_G13_MATCLASE_PRES_<Tema>.<ext>`| `/ISW_G13_MATERIAL_CLASE/PRESENTACIONES`    |
| **Prácticas** | `ISW_G13_MATCLASE_PRAC_<Caso>.<ext>`| `/ISW_G13_MATERIAL_CLASE/PRACTICAS`  |
| **Resúmenes**                | `ISW_G13_MATCLASE_RESUM_<NombreResumen>.<ext>`| `/ISW_G13_MATERIAL_CLASE/RESUMENES`         |
| **Trabajos Prácticos**   | `ISW_G13_TPs_PRACTICOS_<NRO PRACTICO>.<ext>`| `/ISW_G13_TPs/PRACTICOS`  |
| **Trabajos de Investigación**   | `ISW_G13_TPs_TIGs_<NRO TIGs>.<ext>`| `/ISW_G13_TPs/TIGs`  |

---

## Criterio de Linea Base

Para establecer el criterio de linea base, se va a tener en cuenta el momento de correccion de cada trabajo practico. Se actualizara la version de linea base cada vez que se efectue la correciones de los mismos donde cada version sera justificada y documentada.

----

## Nomenclatura de Linea base

La nomenclatura de la línea base debe respetar el siguiente formato:

- `ISW_G13_LINEABASE<VERSIONxx>_<NOMBRELB><XX>`
- ISW_G13_LINEA_BASE: Prefijo obligatorio para todas las líneas base del proyecto.
- `<VERSIONxx>`: Número de version con dos dígitos, por ejemplo: 03.
- `<NOMBRE_LB>`: Nombre descriptivo en PascalCase (sin espacios ni tildes).
- `<XX>`: Numero de etiqueta correspondiente en caso de reetiquetar por cambios en un TP

Se crea utilizando el siguiente **comando** en la terminal:

```bash
git tag -a ISW_G13_LINEA_BASE_03_EjecucionCasosTP11_1 -m "Línea base 3 - Ejecución de Casos de Prueba TP11"
git push origin ISW_G13_LINEA_BASE_03_EjecucionCasosTP11_1
```

**Consideraciones Finales**

Toda creación de línea base debe ser comunicada al equipo, y la etiqueta generada debe ser registrada en la documentación del proyecto, asegurando su trazabilidad.

----

## Criterio de nombramiento de commits

El mensaje de commit debe estructurarse de la siguiente manera:

`<Acción>: <Descripción breve de los cambios>`

### Acciones recomendadas
- *add* → cuando se agrega un archivo, directorio o funcionalidad nueva.  
- *update* → cuando se actualiza o mejora algo existente.  
- *fix* → cuando se corrige un error o bug.  
- *remove* → cuando se elimina un archivo, directorio o código.  
- *refactor* → cuando se reorganiza o mejora código sin cambiar su funcionalidad.  
- *docs* → cuando se modifican archivos de documentación (README, guías, etc.).
- *create*  →  cuando se crea el repositorio.

### Ejemplos
- add: Guía de enunciados TP1  
- update: resolución del TP2 con correcciones de formato  
- fix: error en el cálculo de fechas en TP3  
- remove: bibliografía duplicada de U2  
- refactor: reestructuración de carpetas de código fuente  
- docs: agregar reglas de nombrado en README
- create: primer commit

--- 
## Glosario

- ISW: Ingenieria y calidad de Software 
- G13: Grupo 13 de la materia Ingenieria y calidad de Software 

---

## Otros

La fecha estará en formato "dd-mm-aaaa". Por ejemplo, el día 5 de noviembre de 2025 sería "05-11-2025".

---------------------