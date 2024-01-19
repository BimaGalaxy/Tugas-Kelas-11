import Form from 'react-bootstrap/Form';
import CustomButton from './Button';
import React from "react";

function FormOsis() {
    return (
        <Form>
            <Form.Group className="mb-3" controlId="nama">
                <Form.Label>Nama</Form.Label>
                <Form.Control type="text" placeholder="Masukkan Nama" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="alamat" >
                <Form.Label>Alamat</Form.Label>
                <Form.Control type="text" placeholder="Masukkan Alamat" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Check
                    type="radio"
                    label="Laki - Laki"
                    name="jenisKelamin"
                    id="radioLaki"
                />
                <Form.Check
                    type="radio"
                    label="Perempuan"
                    name="jenisKelamin"
                    id="radioPerempuan"
                />
            </Form.Group>
            <CustomButton variant="primary" width="200px" height="50px">
                Submit
            </CustomButton>
        </Form>
    );
}

export default FormOsis;