import {render, screen} from "@testing-library/react";
import {Login} from './login';
import "@testing-library/jest-dom";


test('text', () => {
    const {getByText} = render(<Login />);
    const text = getByText(/Войти/i);
    expect(text).toBeInTheDocument();
});