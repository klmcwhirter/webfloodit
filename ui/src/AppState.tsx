import {
  Accessor,
  Context,
  Setter,
  createContext,
  createSignal,
  useContext,
} from "solid-js";
import { FloodItStrategy } from "./floodit.model";

export class AppState {
  constructor(
    private strategy: Accessor<FloodItStrategy>,
    private setStrategy: Setter<FloodItStrategy>
  ) {}

  choose(color: string) {
    // console.log(`choose: color=${color}`);
    const curr = this.strategy();
    const model = new FloodItStrategy(curr);
    model.choose(color);
    this.setStrategy(model);
  }

  reset() {
    console.log("reset: resetting game:");
    origState = new FloodItStrategy();
    this.setStrategy(origState);
  }

  restartGame() {
    console.log("restartGame: restarting game");
    const model = new FloodItStrategy(origState);
    this.setStrategy(model);
  }
}

const AppContext = createContext<AppState>() as Context<AppState>;

let origState: FloodItStrategy = new FloodItStrategy();

export function AppContextProvider(props) {
  const [strategy, setStrategy] = createSignal(origState);

  const store = new AppState(strategy, setStrategy);

  return (
    <AppContext.Provider value={store}>{props.children}</AppContext.Provider>
  );
}

export const useAppState = () => useContext<AppState>(AppContext);
