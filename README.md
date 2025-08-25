# ISW_Grupo13
Repositorio del grupo 13 de la materia Ingenieria y Calidad de Software UTN

Integrantes:

Demaria Alexis_95754
Pavon Martini Agustin 94494
Serafini Augusto 94373
Martos Leonel Agustin 94297
Valverde Segura Fabrizio  96061
Di Vincenzo Franca 95399
Tavella Valentino 78973

Estructura del repositorio:

ISW_G13_BIBLIOGRAFIA
ISW_G13_CODFUENTE
ISW_G13_CONFIGURACION
ISW_G13_PRACTICO
ISW_G13_RESUMENES
ISW_G13_TPs


Reglas de nombrado:

<NombreDeLaMateria>_<NombreGrupo>_<Prefijo>_<NombreDelArchivo>_<VersionDelItem>.<ExtensionDelArchivo>

<NombreDeLaMateria> → Identifica la materia a la que pertenece el archivo.
Ejemplo: ISW (Ingeniería de Software).

<NumeroGrupo> →  número del grupo de trabajo.
Ejemplo: G13.

<NombreDelArchivo> → Breve descripción o título del archivo.
Ejemplo: CynefinFramework, GuiaUsoGit, Clase1.

<ExtensionDelArchivo> → Extensión del tipo de archivo.
Ejemplo: .pdf, .docx, .pptx, .png.


# 📂 Reglas de Nombrado – Grupo 13

| Ítem de configuración     | Regla de nombrado                            | Ejemplo                                  | Ubicación Física        |
|----------------------------|-----------------------------------------------|------------------------------------------|-------------------------|
| **Bibliografía**          | `<Materia>_G13_<NombreArchivo>.<ext>`        | `ISW_G13_CynefinMiniBook.pdf`            | `/Bibliografia`         |
| **Código Fuente**         | `<Materia>_G13_<NombreArchivo>.<ext>`        | `ISW_G13_ModuloLogin.zip`                | `/CodFuente`            |
| **Configuración**         | `<Materia>_G13_<NombreArchivo>.<ext>`        | `ISW_G13_DiagramaClases.png`             | `/Configuracion`        |
| **Prácticos – Enunciados**| `<Materia>_G13_<DescripcionTP>.<ext>`        | `ISW_G13_EnunciadoTP3.pdf`               | `/TPs/Enunciados`       |
| **Prácticos – Resoluciones** | `<Materia>_G13_<DescripcionTP>.<ext>`     | `ISW_G13_ResolucionTP3.docx`             | `/TPs/Resoluciones`     |
| **Resúmenes**             | `<Materia>_G13_<NombreArchivo>.<ext>`        | `ISW_G13_ResumenUnidad2.pdf`             | `/Resumenes`            |
| **Prácticos Conceptuales**| `<Materia>_G13_<NombreArchivo>.<ext>`        | `ISW_G13_FrameworkCynefin.pdf`           | `/TPs/Conceptuales`     |

Criterio de Linea Base:

Para establecer el criterio de linea base, se va a tener en cuenta el momento de correccion de cada trabajo practico. Se actualizara la version de linea base cada vez que se efectue la correciond e los mismos donde cada version sera justificada y documentada

Nomenclatura de Linea base:

La nomenclatura de la línea base debe respetar el siguiente formato:

ISW_G13_LINEABASE<ITERxx>_<NOMBRELB><NN>
ISW_G13_LINEA_BASE: Prefijo obligatorio para todas las líneas base del proyecto.
<ITERxx>: Número de iteración con dos dígitos, por ejemplo: 3.
<NOMBRE_LB>: Nombre descriptivo en PascalCase (sin espacios ni tildes), reflejando el contexto o propósito de la línea base.
<NN>: se refiere a la numeracion de esa etiqueta, en caso de que se tenga que reetiquetar por un cambio en ese Trabajo practico especificamente
Ejemplo de Línea Base
Para la línea base correspondiente a la ejecución de casos de prueba del TP11, la etiqueta a utilizar es:

ISW_G13_LINEA_BASE_3_EjecucionCasosTP11_1
Se crea utilizando el siguiente comando en la terminal:

git tag -a ISW_G13_LINEA_BASE_3_EjecucionCasosTP11_1 -m "Línea base 3 - Ejecución de Casos de Prueba TP11"
git push origin ISW_G13_LINEA_BASE_3_EjecucionCasosTP11_1
Consideraciones Finales
Toda creación de línea base debe ser comunicada al equipo, y la etiqueta generada debe ser registrada en la documentación del proyecto, asegurando su trazabilidad.

Nombramiento de Commit:

## Criterio de nombramiento de commits

El mensaje de commit debe estructurarse de la siguiente manera:

<Acción>: <Descripción breve de los cambios>

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

Glosario:

ISW: Ingenieria y calidad de Software 
G13: Grupo 13 de la materia Ingenieria y calidad de Software 

Otros:

La fecha estará en formato "dd-mm-aaaa". Por ejemplo, el día 5 de noviembre de 2025 sería "05-11-2025".


---------------------

# ISW_Grupo13
Repositorio del **Grupo 13** de la materia **Ingeniería y Calidad de Software – UTN**

---

## 📌 Índice
1. [Integrantes](#-integrantes)  
2. [Estructura del repositorio](#-estructura-del-repositorio)  
3. [Reglas de nombrado](#-reglas-de-nombrado)  
   - [Tabla de nombrado – Grupo 13](#-reglas-de-nombrado--grupo-13)  
4. [Criterio de Línea Base](#-criterio-de-línea-base)  
5. [Nombramiento de Commits](#-nombramiento-de-commits)  
6. [Glosario](#-glosario)  
7. [Otros](#-otros)  

---

## 👥 Integrantes

- Demaria Alexis – 95754  
- Pavon Martini Agustín – 94494  
- Serafini Augusto – 94373  
- Martos Leonel Agustín – 94297  
- Valverde Segura Fabrizio – 96061  
- Di Vincenzo Franca – 95399  
- Tavella Valentino – 78973  

---

## 📂 Estructura del repositorio

- `ISW_G13_BIBLIOGRAFIA`  
- `ISW_G13_CODFUENTE`  
- `ISW_G13_CONFIGURACION`  
- `ISW_G13_PRACTICO`  
- `ISW_G13_RESUMENES`  
- `ISW_G13_TPs`  

---

## 📑 Reglas de Nombrado

**Formato general:**


- `<NombreDeLaMateria>` → Identifica la materia a la que pertenece el archivo.  
  Ejemplo: `ISW` (Ingeniería de Software).  

- `<NumeroGrupo>` → Número del grupo de trabajo.  
  Ejemplo: `G13`.  

- `<NombreDelArchivo>` → Breve descripción o título del archivo.  
  Ejemplo: `CynefinFramework`, `GuiaUsoGit`, `Clase1`.  

- `<ExtensionDelArchivo>` → Extensión del tipo de archivo.  
  Ejemplo: `.pdf`, `.docx`, `.pptx`, `.png`.  

---

## 📂 Reglas de Nombrado – Grupo 13

| Ítem de configuración       | Regla de nombrado                   | Ejemplo                             | Ubicación Física     |
|------------------------------|--------------------------------------|-------------------------------------|----------------------|
| **Bibliografía**             | `<Materia>_G13_<NombreArchivo>.<ext>` | `ISW_G13_CynefinMiniBook.pdf`       | `/Bibliografia`      |
| **Código Fuente**            | `<Materia>_G13_<NombreArchivo>.<ext>` | `ISW_G13_ModuloLogin.zip`           | `/CodFuente`         |
| **Configuración**            | `<Materia>_G13_<NombreArchivo>.<ext>` | `ISW_G13_DiagramaClases.png`        | `/Configuracion`     |
| **Prácticos – Enunciados**   | `<Materia>_G13_<DescripcionTP>.<ext>` | `ISW_G13_EnunciadoTP3.pdf`          | `/TPs/Enunciados`    |
| **Prácticos – Resoluciones** | `<Materia>_G13_<DescripcionTP>.<ext>` | `ISW_G13_ResolucionTP3.docx`        | `/TPs/Resoluciones`  |
| **Resúmenes**                | `<Materia>_G13_<NombreArchivo>.<ext>` | `ISW_G13_ResumenUnidad2.pdf`        | `/Resumenes`         |
| **Prácticos Conceptuales**   | `<Materia>_G13_<NombreArchivo>.<ext>` | `ISW_G13_FrameworkCynefin.pdf`      | `/TPs/Conceptuales`  |

---

## 📌 Criterio de Línea Base

- El criterio de línea base se establecerá en el momento de la **corrección de cada trabajo práctico**.  
- Se actualizará la versión de línea base cada vez que se efectúe una corrección.  
- Cada versión será **justificada y documentada**.  

### 🔹 Nomenclatura de Línea Base


- `ISW_G13_LINEA_BASE`: Prefijo obligatorio para todas las líneas base del proyecto.  
- `<ITERxx>`: Número de iteración con dos dígitos (ejemplo: `03`).  
- `<NOMBRELB>`: Nombre descriptivo en **PascalCase**, sin espacios ni tildes.  
- `<NN>`: Numeración de la etiqueta, en caso de reetiquetar por cambios en un TP.  

**Ejemplo:**  


**Comando Git:**

```bash
git tag -a ISW_G13_LINEA_BASE_03_EjecucionCasosTP11_1 -m "Línea base 3 - Ejecución de Casos de Prueba TP11"
git push origin ISW_G13_LINEA_BASE_03_EjecucionCasosTP11_1

<Acción>: <Descripción breve de los cambios>

🔹 Acciones recomendadas

add → agregar archivo, directorio o funcionalidad nueva.

update → actualizar o mejorar algo existente.

fix → corregir un error o bug.

remove → eliminar archivo, directorio o código.

refactor → reorganizar o mejorar código sin cambiar su funcionalidad.

docs → modificar documentación (README, guías, etc.).

create → crear el repositorio.

🔹 Ejemplos

add: Guía de enunciados TP1

update: Resolución del TP2 con correcciones de formato

fix: Error en el cálculo de fechas en TP3

remove: Bibliografía duplicada de U2

refactor: Reestructuración de carpetas de código fuente

docs: Agregar reglas de nombrado en README

create: Primer commit

📖 Glosario

ISW → Ingeniería y Calidad de Software

G13 → Grupo 13 de la materia Ingeniería y Calidad de Software