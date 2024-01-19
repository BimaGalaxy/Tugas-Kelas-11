import React, {Component} from 'react';
import './App.css';
import Media from './Components/Media';
import CustomButton from './Components/Button';
import FormOsis from './Components/Osis';

class App extends Component {
  render(){
    return (
        <div>
        <header>
            <div className='title'> PANCASILA</div>
            <div className='head-text'>
                <div className='text-on-image'>
                    <strong>Sila Pertama</strong>
                    <br></br>
                    Ketuhanan Yang Maha Esa
                </div>
                <Media image="sila-1.png"></Media>
            </div>

            <div className='head-text'>
                <div className='text-on-image'>
                    <strong>Sila Kedua</strong>
                    <br></br>
                    Kemanusiaan Yang Adil dan Beradab
                </div>
                <Media image="sila-2.png"></Media>
            </div>

            <div className='head-text'>
                <div className='text-on-image'>
                    <strong>Sila Ketiga</strong>
                    <br></br>
                    Persatuan Indonesia
                </div>
                <Media image="sila-3.png"></Media>
            </div>

            <div className='head-text'>
                <div className='text-on-image'>
                    <strong>Sila Keempat</strong>
                    <br></br>
                    Kerakyatan yang dipimpin oleh hikmat dalam kebijaksanaan permusyawaratan perwakilan
                </div>
                <Media image="sila-4.png"></Media>
            </div>

            <div className='head-text'>
                <div className='text-on-image'>
                    <strong>Sila Kelima</strong>
                    <br></br>
                    Keadilan sosial bagi seluruh rakyat Indonesia
                </div>
                <Media image="sila-5.png"></Media>
            </div>
        </header>

        <div className="container-button">
            <h1>Button</h1>
            <CustomButton variant="primary" width="900px" height="50px">
                Click me
            </CustomButton>
            <CustomButton variant="danger" width="900px" height="50px">
                Click me
            </CustomButton>
            <CustomButton variant="warning" width="900px" height="50px">
                Click me
            </CustomButton>
            <CustomButton variant="success" width="900px" height="50px">
                Click me
            </CustomButton>
        </div>

        <div className="Pendaftaran">
            <h1>Pendaftaran</h1>
            <FormOsis />
        </div>

</div>
    )
  }
}

export default App;