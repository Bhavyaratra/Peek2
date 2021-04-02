import React from 'react';
import Content from './Content';
import Title from './Title';
import Submit from './Buttons/Submit'
import './Note.css';

export default function Note(){
    return(<form>
        <Title/>
        <br/>
        <Content/>
       <Submit/>
    </form>);
}