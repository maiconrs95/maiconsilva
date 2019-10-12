import React from 'react';

import Icons from './Icons';
import links from './content';
import {
    SocialLinksWrapper,
    SocialLinksList,
    SocialLinksItem,
    SocialLinksLink,
    IconWrapper,
} from './SocialLinksStyled';

function SocialLinks() {
    return (
        <SocialLinksWrapper>
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

export default SocialLinks;
