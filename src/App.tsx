import { createSignal } from "solid-js";

import { Board, Palette, Toolbar, WinText } from "./components";
import { FloodItStrategy } from "./floodit.model";

let origState: FloodItStrategy = new FloodItStrategy();

function App() {
  const [state, setState] = createSignal(origState);

  function chooseColor(color: string) {
    // console.log(`choose: color=${color}`);
    const curr = state();
    const model = new FloodItStrategy(curr);
    model.choose(color);
    setState(model);
  }

  function newGame(size: number, numMoves: number): void {
    console.log("reset: resetting game:");
    FloodItStrategy.BOARD_SIZE = size;
    FloodItStrategy.MOVES_LIMIT = numMoves;
    origState = new FloodItStrategy();
    setState(origState);
  }

  function restartGame(): void {
    console.log("restartGame: restarting game");
    const model = new FloodItStrategy(origState);
    setState(model);
  }

  return (
    <div class="container">
      <Toolbar onNew={newGame} onRestart={restartGame}></Toolbar>
      <Palette colors={state().colors} onChoose={chooseColor}></Palette>
      <WinText win_text={state().win_text}></WinText>
      <Board state={state()}></Board>
    </div>
  );
}

export default App;
