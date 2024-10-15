import type Phone from './phone/Phone';
import type Tablet from './tablet/Tablet';

export default interface ProductCollection {
    phones: Phone[];
    tablets: Tablet[];
}