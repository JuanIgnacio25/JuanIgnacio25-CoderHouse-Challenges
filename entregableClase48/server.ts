import deps from "./deps.ts";

const app = new deps.Oak.Application();

const rutas = new deps.Router({ prefix: "/colores" });
const colores: string[] = ["red", "blue", "yellow"];

rutas.get("/", (ctx) => {
  ctx.response.body = `
  <html>
    <head>
    </head>
   <body>
      <form action="/colores" enctype="multipart/form-data"  method="post">
        <input type="text" name="color" placeHolder="agregar un color"/>
        <input type="submit" value="agregar color"/>
      </form>
      <div style="background-color:black">
        <h2 style="color:white">Colores</h2>
        <ul>
          ${colores.map((c) => `<li style="color:${c}">${c}</li>`)}
        </ul>
      </div>
    </body>
  </html>
  `;
});

rutas.post("/",async (ctx) => {
  const list =await ctx.request.body({type:"form-data"}).value.read()
  const color=list.fields.color
  colores.push(color)
 ctx.response.redirect('/colores');
});

app.use(rutas.routes());

app.listen({ port: 8080 });