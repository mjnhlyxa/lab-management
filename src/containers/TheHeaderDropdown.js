import React from 'react';
import { CBadge, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg, CSwitch } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { Flex, Text } from 'rebass';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_SUPPORTED } from 'utils/constants';

const TheHeaderDropdown = () => {
    const { t, i18n } = useTranslation();

    const onLanguagechange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            i18n.changeLanguage(LANGUAGE_SUPPORTED.VIE);
        } else {
            i18n.changeLanguage(LANGUAGE_SUPPORTED.ENG);
        }
    };

    return (
        <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
            <CDropdownToggle className="c-header-nav-link" caret={false}>
                <div className="c-avatar">
                    <CImg src={'avatars/6.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                </div>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownItem header tag="div" color="light" className="text-center">
                    <strong>{t('settings.account')}</strong>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-bell" className="mfe-2" />
                    {t('settings.update')}
                    <CBadge color="info" className="mfs-auto">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-envelope-open" className="mfe-2" />
                    {t('settings.msg')}
                    <CBadge color="success" className="mfs-auto">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-comment-square" className="mfe-2" />
                    {t('settings.cmts')}
                    <CBadge color="warning" className="mfs-auto">
                        42
                    </CBadge>
                </CDropdownItem>
                <CDropdownItem header tag="div" color="light" className="text-center">
                    <strong>{t('settings.setting')}</strong>
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-user" className="mfe-2" />
                    {t('settings.profile')}
                </CDropdownItem>
                <CDropdownItem>
                    <CIcon name="cil-settings" className="mfe-2" />
                    {t('settings.setting')}
                </CDropdownItem>
                <CDropdownItem header tag="div" color="light" className="text-center">
                    <p>
                        <strong>Language</strong>
                    </p>
                    <Flex flexDirection="row" ml={4}>
                        <Text pt={1} pr={2} as="p">
                            EN
                        </Text>
                        <CSwitch className={'mx-1'} variant={'3d'} color={'primary'} onChange={onLanguagechange} />
                        <Text pt={1} pl={2} as="p">
                            VI
                        </Text>
                    </Flex>
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default TheHeaderDropdown;
