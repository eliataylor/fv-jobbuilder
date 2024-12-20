export interface Parameter {
    id: string;
    name: string;
    type: 'text' | 'number';
    mandatory: boolean;
    value?: string | number;
}
