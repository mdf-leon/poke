import { Link } from "react-router-dom";

function Sidebar() {
  const SideLink = (props: any) => {
    return (
      <Link to={props.to}>
        <div className="hover:bg-[#282C34] border-[#282C34] border-2 m-2 p-1 rounded">
          {props.title}
        </div>
      </Link>
    );
  };

  return (
    <div className="h-full min-w-[200px] bg-[#21252B]">
      <div className="m-2 p-1 mt-10">Páginas</div>
      <SideLink title="Início" to="/" />
      <SideLink title="Contato" to="/" />
      <SideLink title="Projetos/Portfolio" to="/" />
      <div className="m-2 p-1 mt-10">Blog</div>
      <SideLink title="Tailwind" to="/b/tailwind" />
      <SideLink title="Typescript" to="/b/typescript" />
      <SideLink title="SOLID" to="/b/solid" />
      <SideLink title="SLDC" to="/b/sldc" />
      <SideLink title="Micro Serviços" to="/b/micro-servicos" />
      <SideLink title="Design Patterns" to="/b/design-patterns" />
    </div>
  );
}
