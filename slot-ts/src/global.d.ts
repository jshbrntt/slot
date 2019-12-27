import { Stage } from './stubs/Stage';
import { NativeSignal } from './stubs/NativeSignal';

declare global {
  interface Window {
    stage: Stage;
    nativeStage: Stage;
  }
}
