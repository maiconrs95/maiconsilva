import React from 'react';
import propTypes from "prop-types";
import ReactGA from 'react-ga'

import Icons from './Icons';

/* Styled Components */
import links from './content';
import {
    SocialLinksWrapper,
    SocialLinksList,
    SocialLinksItem,
    SocialLinksLink,
    IconWrapper,
} from './SocialLinksStyled';

const socialLinkClickTrack = (social) => {
    ReactGA.event({
        category: 'social link',
        action: 'click',
        label: social
    })
}

function SocialLinks({ hideMobile }) {
    return (
        <SocialLinksWrapper hideMobile={hideMobile}>
            <SocialLinksList>
                {links.map((link, i) => {
                    const Icon = Icons[link.label];

                    return (
                        <SocialLinksItem key={i}>
                            <SocialLinksLink
                                href={link.url}
                                title={link.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => socialLinkClickTrack(link.label)}
                            >
                                <IconWrapper>
                                    <Icon />
                                </IconWrapper>
                            </SocialLinksLink>
                        </SocialLinksItem>
                    );
                })}
            </SocialLinksList>
        </SocialLinksWrapper>
    );
}

SocialLinks.defaultProps = {
    hideMobile: false,
};

SocialLinks.propTypes = {
    hideMobile: propTypes.bool,
};

export default SocialLinks;
