import { Board, Palette, Toolbar, WinText } from "./components";

import { useAppState } from "./AppState";

import styles from "./App.module.css";

function App() {
  const state = useAppState();

  return (
    <div class={styles.container}>
      <Show when={state.strategy().loading}>
        <div>Loading...</div>
      </Show>
      <Show when={state.strategy().error != null}>
        <div>Error: {state.strategy().error}</div>
      </Show>

      <Show when={state.strategy()}>
        <Toolbar
          class={styles.reset}
          onReset={state.reset.bind(state)}
          onRestart={state.restartGame.bind(state)}
        ></Toolbar>
        <Palette
          class={styles.palette}
          colors={state.strategy().colors}
          onChoose={state.choose.bind(state)}
          paletteCell={styles.palettecell}
          paletteList={styles.palettelist}
        ></Palette>
        <WinText
          class={styles.wintext}
          win_text={state.strategy().win_text}
        ></WinText>
        <Board
          class={styles.board}
          rowClass={styles.boardrow}
          cellClass={styles.boardcell}
          state={state.strategy()}
        ></Board>
      </Show>
    </div>
  );
}

export default App;
