import axios from "axios"
import { useFormik } from "formik"
import * as yup from "yup"
import { useEffect, useState } from "react";
import { Input, Header, NavBar } from "~/components"
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const validationSchema = yup.object().shape({
  tipo: yup.string().required("Campo obligatorio"),
  //cuerpo: yup.string().required("Campo obligatorio"),
})


export function EnviarRegistro() {
const formik = useFormik({
  onSubmit: async (values) => {
    alert("entre")
    let formData = new FormData();
      Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
      });
     
      try {
  
          const res = await axios({
              method: "POST",
              baseURL: "http://localhost:3000",
              url: "/saveReport",
              data: formData,
              headers: {
                  "Content-Type": "multipart/form-data"
              }
          })
        } catch (error) {
          alert("Error guardando el informe, error: " + error)
      }

  },
  initialValues: {
      tipo: "",
      cuerpo: "",
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
     <p> <button type="submit">Guardar cambios</button></p>

      </div>
    
    </form>
  </div>
</div>

                </section>
            </main>
        </div>
    );
}
