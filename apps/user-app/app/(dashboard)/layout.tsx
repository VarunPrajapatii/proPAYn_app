// import { SidebarItem } from "./../../components/SidebarItem"


export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
      <div className="">
        {children}
      </div>
  );
}