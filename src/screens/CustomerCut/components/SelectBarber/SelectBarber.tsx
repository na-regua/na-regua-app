import {BarbersService} from '@/app/api';
import {IBarber} from '@/app/models';
import {Button, Icons, Typography} from '@/components/atoms';
import SearchIcon from '@/components/atoms/Icons/SearchIcon/SearchIcon';
import {useAppNavigation} from '@/navigation';
import {AppDispatch} from '@/store/Store';
import {CutActions, fetchBarberServices} from '@/store/slicers';
import React, {useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import {FadeInDown} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {
  AvoidKeyboardStyled,
  CodeInputStyled,
  DropdownItemContentStyled,
  DropdownItemImageStyled,
  DropdownItemInfoStyled,
  DropdownItemStyled,
  DropdownMenuStyled,
  DropdownWrapperStyled,
  LineStyled,
  PageCardRowStyled,
  PageCardTitleStyled,
  SearchButtonStyled,
  ShareQrButtonContentStyled,
  menuShadow,
} from '../../styles';

const SelectBarber = () => {
  const {t} = useTranslation();
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(false);
  const [barbers, setBarbers] = useState<IBarber[]>([]);

  const [menuHeight, setMenuHeight] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigation = useAppNavigation();

  const dispatch = useDispatch<AppDispatch>();

  const canSearch = useMemo(() => search.length > 0, [search]);

  const onSearch = async () => {
    if (!canSearch) {
      return;
    }

    try {
      setLoading(true);

      const {data} = await BarbersService.getBarbers(search);

      if (data) {
        setBarbers(data);
        setShowDropdown(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const selectBarber = async (barber: IBarber, close?: boolean) => {
    dispatch(CutActions.setCutSelectedBarber(barber));
    await dispatch(fetchBarberServices(barber._id));

    dispatch(CutActions.setCutStep('attendance'));
    dispatch(CutActions.setAttendanceType('queue'));

    if (close) {
      closeDropdown();
    }
  };

  const goToQrScanner = () => {
    navigation.navigate('/customer/qr-scanner');
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (Keyboard.isVisible()) {
          Keyboard.dismiss();
        }

        if (showDropdown) {
          closeDropdown();
        }
      }}>
      <AvoidKeyboardStyled>
        <PageCardTitleStyled>
          <Typography variant="h4">{'customer.cut.select.title'}</Typography>
          <Typography variant="body2" color="black2">
            {'customer.cut.select.subtitle'}
          </Typography>
        </PageCardTitleStyled>
        <PageCardRowStyled>
          <CodeInputStyled
            onChangeText={text => {
              setSearch(text);
            }}
            value={search}
            label="customer.cut.fields.search"
            placeholder={t('customer.cut.fields.code')}
            blurOnSubmit
            onSubmitEditing={() => {
              if (canSearch) {
                onSearch();
              }
            }}
            returnKeyType={'search'}
            textContentType="none"
          />
          <SearchButtonStyled
            customContent={<SearchIcon color="primary" disabled />}
            onPress={onSearch}
            disabled={!canSearch}
            loading={loading}
          />

          {showDropdown && barbers.length > 0 && (
            <DropdownWrapperStyled
              style={menuShadow}
              gap={menuHeight}
              entering={FadeInDown}>
              <DropdownMenuStyled
                onScroll={event => {
                  event.stopPropagation();
                }}
                onLayout={event => {
                  setMenuHeight(event.nativeEvent.layout.height);
                }}
                scrollEventThrottle={16}>
                {barbers.map((barber, index) => {
                  const isFirst = index === 0;
                  const isLast = index === barbers.length - 1;

                  return (
                    <DropdownItemStyled
                      first={isFirst}
                      last={isLast}
                      onPress={() => {
                        selectBarber(barber, true);
                      }}
                      key={index}>
                      <DropdownItemContentStyled>
                        <DropdownItemImageStyled
                          source={{uri: barber.avatar.url}}
                        />
                        <DropdownItemInfoStyled>
                          <Typography variant="body1">{barber.name}</Typography>
                          <Typography variant="caption" color="black1">
                            {barber.code}
                          </Typography>
                        </DropdownItemInfoStyled>
                      </DropdownItemContentStyled>
                    </DropdownItemStyled>
                  );
                })}
              </DropdownMenuStyled>
            </DropdownWrapperStyled>
          )}
        </PageCardRowStyled>
        <LineStyled />
        <Button
          customContent={
            <ShareQrButtonContentStyled>
              <Icons.QRIcon color="main" disabled />
              <Typography variant="button" color="black3">
                {'customer.home.buttons.readQr'}
              </Typography>
            </ShareQrButtonContentStyled>
          }
          variant="ghost"
          onPress={goToQrScanner}
        />
        <LineStyled />
        {/* <SectionStyled>
        <SectionTitleStyled>
          <Typography variant="body1" color="black2">
            {'customer.cut.select.recents.title'}
          </Typography>
        </SectionTitleStyled>
        <HorizontalScrollStyled>
          {[1, 2, 3, 4].map(el => (
            <BarberItemStyled key={el}>
              <>
                <BarberImageStyled
                  source={{
                    uri: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
                <BarberInfoStyled>
                  <BarberItemTitleStyled>
                    <Typography variant="body1">{'Barbeiro josé'}</Typography>
                    <Typography variant="tip">{'4.8'}</Typography>
                  </BarberItemTitleStyled>
                  <BarberItemLocationStyled>
                    <Typography variant="caption" color="black1">
                      {'Rua josé da silva'}
                    </Typography>
                  </BarberItemLocationStyled>
                </BarberInfoStyled>
              </>
            </BarberItemStyled>
          ))}
        </HorizontalScrollStyled>
      </SectionStyled>
      <SectionStyled>
        <SectionTitleStyled>
          <Typography variant="body1" color="black2">
            {'customer.cut.select.near.title'}
          </Typography>
          <Typography variant="caption" color="black1">
            {'customer.cut.select.near.subtitle'}
          </Typography>
        </SectionTitleStyled>
        <HorizontalScrollStyled>
          {[1, 2, 3, 4].map(el => (
            <BarberItemStyled key={el}>
              <>
                <BarberImageStyled
                  source={{
                    uri: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=2240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                  }}
                />
                <BarberInfoStyled>
                  <BarberItemTitleStyled>
                    <Typography variant="body1">{'Barbeiro josé'}</Typography>
                    <Typography variant="tip">{'4.8'}</Typography>
                  </BarberItemTitleStyled>
                  <BarberItemLocationStyled>
                    <Typography variant="caption" color="black1">
                      {'Rua josé da silva'}
                    </Typography>
                  </BarberItemLocationStyled>
                </BarberInfoStyled>
              </>
            </BarberItemStyled>
          ))}
        </HorizontalScrollStyled>
      </SectionStyled> */}
      </AvoidKeyboardStyled>
    </TouchableWithoutFeedback>
  );
};

export {SelectBarber};
