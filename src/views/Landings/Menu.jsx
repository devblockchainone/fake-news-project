/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import LogoBluiding from '../../images/icon-bco.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const Menu = props => (
    <section>
        <div className="MenuPage">
            <div className="MenuCenter">
                <img className="imgLogo" src={LogoBluiding} alt="logo" />
            </div>
            <div className="MenuRight">
                <div className="SpaceIcons">
                    <a href="https://twitter.com/home" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} className="IconSocialMedia" /></a>
                </div>
                <div className="SpaceIcons">
                    <a href="https://github.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faGithub} className="IconSocialMedia"/></a>
                </div>
                <div className="SpaceIcons">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedinIn} className="IconSocialMedia" /></a>
                </div>
            </div>
        </div>
    </section>
)

export default Menu