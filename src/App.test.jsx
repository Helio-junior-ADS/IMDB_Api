import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test } from "vitest";


import Footer from "./components/Footer";
import Home from "./pages/Home";



describe("Teste de Components", () => {
  test("Deverá renderizar o footer na tela", () => {
    const { getByText } = render(<Footer />);

    expect(getByText("IMDB Api")).toBeInTheDocument();
  });

  test("Deverá renderiza o titulo na tela", () => {
    const { getByText } = render(<Home />);

    expect(getByText("Melhores filmes:")).toBeInTheDocument();
  });

 

  
});
