import { createSignal } from "solid-js";

import { Board, Palette, Toolbar, WinText } from "./components";
import { FloodItStrategy } from "./floodit.model";

let origState: FloodItStrategy = new FloodItStrategy();

function App() {
  const [strategy, setStrategy] = createSignal(origState);

  function choose(color: string) {
    // console.log(`choose: color=${color}`);
    const curr = strategy();
    const model = new FloodItStrategy(curr);
    model.choose(color);
    setStrategy(model);
  }

  function reset(): void {
    console.log("reset: resetting game:");
    origState = new FloodItStrategy();
    setStrategy(origState);
  }

  function restartGame(): void {
    console.log("restartGame: restarting game");
    const model = new FloodItStrategy(origState);
    setStrategy(model);
  }

  return (
    <div class="container">
      <Toolbar class="reset" onReset={reset} onRestart={restartGame}></Toolbar>
      <Palette
        class="palette"
        colors={strategy().colors}
        onChoose={choose}
        paletteCell="palettecell"
        paletteList="palettelist"
      ></Palette>
      <WinText class="wintext" win_text={strategy().win_text}></WinText>
      <Board
        class="board"
        rowClass="boardrow"
        cellClass="boardcell"
        state={strategy()}
      ></Board>
    </div>
  );
}

export default App;
