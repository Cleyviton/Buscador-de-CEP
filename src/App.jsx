import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./style/style.css";
import api from "./sevices/api";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [endereco, setEndereco] = useState({});

  async function handleSearch() {
    if (inputValue == "") {
      alert("Informar um CEP para buscar");
      return;
    }

    try {
      const requisicao = await api.get(`${inputValue}/json/`);
      console.log(requisicao.data);
      setEndereco(requisicao.data);
      setInputValue("");
    } catch {
      alert(
        "Desculpe, não encontramos o CEP informado, por favor verifique e tente novamente!"
      );
      setInputValue("");
    }
  }

  return (
    <div className="App">
      <h1 className="titleBuscador">Buscador de CEP</h1>
      <div className="div__container">
        <input
          type="text"
          placeholder="Digite seu CEP..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={30} color={"#fff"} />
        </button>
      </div>
      {Object.keys(endereco).length > 0 && (
        <main className="main__container">
          <h2>CEP: {endereco.cep}</h2>
          <span>
            logradouro:{" "}
            {endereco.logradouro == "" ? "Sem Informação" : endereco.logradouro}
          </span>
          <span>
            Complemento:{" "}
            {endereco.complemento == ""
              ? "Sem Informação"
              : endereco.complemento}
          </span>
          <span>
            Bairro: {endereco.bairro == "" ? "Sem Informação" : endereco.bairro}
          </span>
          <span>
            {endereco.localidade} - {endereco.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
