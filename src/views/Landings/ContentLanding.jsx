/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

const ContentLanding = props => (
    <section>
        <div className="banner">
            <div className="backgroundBannerOne"></div>
            <div className="backgroundBannerTwo"></div>
            <div className="banner-content">
                <div className="position-banner-text">
                    <h2 className="text-banner-title">The new decentralized crypto for long-term sustainable financing.</h2>
                    <p className="text-banner-description">Designed to expand access and guarantee the supply of <span className="text-banner-description-span">clean water and sanitation services</span> for communities in need.</p>
                    <div className="position-banner-btns">
                        <a className="banner-btn btn-connect" href="{#}" rel="noreferrer">Connect</a>
                        <a className="banner-btn btn-collab" href="{#}" rel="noreferrer">Collaborate</a>
                        <a className="banner-btn btn-more" href="{#}" rel="noreferrer">Learn more</a>
                    </div>
                </div>
                <div className="position-banner-image">
                    <img className="img-banner" src="" alt="img-banner" />
                </div>
            </div>
        </div>
    </section>
)

export default ContentLanding