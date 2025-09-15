import React from "react";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bem-vindo ao meu App</h1>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // ocupa tela inteira
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: "2rem",
    color: "#333",
  },
};

export default Home;
