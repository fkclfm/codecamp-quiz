import Banner from "./banner";
import Header from "./header";
import Navigation from "./navigation";

interface ILayoutProps {
  children: any;
}

export default function Layout(props: ILayoutProps) {
  return (
    <>
      <Header />
      <Banner />
      <Navigation />
      <div>{props.children}</div>
    </>
  );
}
