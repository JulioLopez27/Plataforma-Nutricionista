import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"
import { useEffect,useLayoutEffect, useState } from "react";
import { Input, Header, NavBar } from "~/components"
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const validationSchema = yup.object().shape({
  tipo: yup.string().required("Campo obligatorio"),
  //cuerpo: yup.string().required("Campo obligatorio"),
})

const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
       const idConsultante2 = urlParams.get('idConsultante');
      

export function EnviarRegistro() {

  //Este codigo queda para futura implementacion de borradores.

 // useLayoutEffect (() => {
 //     const queryString = window.location.search;
 //     const urlParams = new URLSearchParams(queryString);
 //     const idBorrador = urlParams.get('tipo');
 //     if (idBorrador) {
  //      const fetchData = async () => {
   //       try {
  //          const response = await axios.get(`http://localhost:3000/getReport?id=${idBorrador}`);
  
   //         document.getElementById("tipo").value = response.data.tipo;
  //          document.getElementById("aux").value= response.data.nota;
    
  //        } catch (error) {
 //           console.error('Error trayendo la data del registro:', error);
//          }
//        };
  
  //      fetchData();
 //     }
//    }, []);
  
  //  const seteo =useEffect=() => {
 //      editor.setData(document.getElementById("aux").value);
      
//   }


const formik = useFormik({
  onSubmit: async (values) => {
   // alert("entre")
    //document.getElementById("idConsultante").value= idConsultante
   // formik.setFieldValue("idConsultante", idConsultante); 
    let formData = new FormData();
      Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
      });
        
      try {
  
          const res = await axios({
              method: "POST",
              baseURL: "http://localhost:3000",
              url: '/saveReport?idConsultante=',
              data: formData,
              headers: {
                  "Content-Type": "multipart/form-data",
              }
          })
          alert("Reporte enviado correctamente!")
         
          location.reload();  

        } catch (error) {
          alert("Error guardando el informe, error: " + error)
      }
      

  },
  initialValues: {
      tipo: "",
      cuerpo: "",
      idConsultante:idConsultante2
  },
  validationSchema
})
  
const handleEditorChange = (event, editor) => {
  const content = editor.getData(); // Get CKEditor content
  formik.setFieldValue("cuerpo", content); // Update Formik field value
};

const handleEditorBlur = () => {
  formik.setFieldTouched("cuerpo", true); // Mark the field as touched
};



  //Esto tiene que ser dinamico., consultante sacarlo de la uRL?
   const data={id_consultante:"2"};
    return (
       
        <div>
            <Header />
            <NavBar />
            <main className="mt-4 h-44">
                <section id="enviarRegistro" className="container justify-center" >
                <div class="flex justify-center items-center h-44">
  <div class=" w-9/12 h-44">
    <form class="h-44" onSubmit={formik.handleSubmit}  encType="multipart/form-data">
      <Input type="hidden" id="idConsultante" name="idConsultante" value={formik.values.idConsultante} />
      <Input label="Titulo" name="tipo" type="text" id="tipo" placeholder="Ingrese un titulo para el informe..." 
           error={formik.touched.tipo && formik.errors.tipo}
           value={formik.values.tipo}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
      />
      <div class=" h-44">
        <CKEditor
          editor={ClassicEditor}
          id="cuerpo"
          name="cuerpo"
         //Pre carga de datos queda para futuro
         // data={seteo}
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={handleEditorChange}
          onBlur={handleEditorBlur}
      
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
          init={{
            height: "auto",
            placeholder:"Ingrese el informe...",
        
        }}
        error={formik.touched.cuerpo && formik.errors.cuerpo}
        value={formik.values.cuerpo}
   

        />
     <p> <button type="submit" class=" bg-purple-400 p-2">Guardar cambios</button></p>

      </div>
    
    </form>
  </div>
</div>

                </section>
            </main>
        </div>
    );
}
