import React, {useEffect, useMemo, useState} from 'react';

import {
  Collapse,
  SelectScheduleLimit,
  SelectWorkDays,
  SwitchButton,
} from '@/components/atoms';

export interface IBarberServiceGeneralConfig {
  workDays: string[];
  scheduleLimitDays: number;
  openBarberAuto: boolean;
  openQueueAuto: boolean;
}

interface IServiceGeneralConfigCardProps {
  config: IBarberServiceGeneralConfig;
  onChange: (newConfig: Partial<IBarberServiceGeneralConfig>) => void;
}

const ServiceGeneralConfigCard: React.FC<IServiceGeneralConfigCardProps> = ({
  config,
  onChange,
}) => {
  const [workDays, setWorkDays] = useState(config.workDays);
  const [scheduleLimitDays, setScheduleLimitDays] = useState(
    config.scheduleLimitDays,
  );
  const [openBarberAuto, setOpenBarberAuto] = useState(config.openBarberAuto);
  const [openQueueAuto, setOpenQueueAuto] = useState(config.openQueueAuto);

  const handleWorkDaysChange = (newWorkDays: string[]) => {
    setWorkDays(newWorkDays);
  };

  const handleScheduleLimitDaysChange = (newScheduleLimitDays: number) => {
    setScheduleLimitDays(newScheduleLimitDays);
  };

  const handleOpenBarberAutoChange = (value: boolean) => {
    setOpenBarberAuto(value);
  };

  const handleOpenQueueAutoChange = (value: boolean) => {
    setOpenQueueAuto(value);
  };

  const workDaysChanged = useMemo(() => {
    if (workDays.length !== config.workDays.length) {
      return true;
    }

    const [bigger, smaller] =
      workDays.length > config.workDays.length
        ? [workDays, config.workDays]
        : [config.workDays, workDays];

    const hasDiff = bigger
      .map(day => smaller.includes(day))
      .some(item => !item);

    return hasDiff;
  }, [workDays, config.workDays]);

  const scheduleLimitDaysChanged = useMemo(
    () => scheduleLimitDays !== config.scheduleLimitDays,
    [scheduleLimitDays, config.scheduleLimitDays],
  );

  const openBarberAutoChanged = useMemo(
    () => openBarberAuto !== config.openBarberAuto,
    [openBarberAuto, config.openBarberAuto],
  );

  const openQueueAutoChanged = useMemo(
    () => openQueueAuto !== config.openQueueAuto,
    [openQueueAuto, config.openQueueAuto],
  );

  useEffect(() => {
    const onChangePayload: Partial<IBarberServiceGeneralConfig> = {};

    if (workDaysChanged) {
      onChangePayload.workDays = workDays;
    }

    if (scheduleLimitDaysChanged) {
      onChangePayload.scheduleLimitDays = scheduleLimitDays;
    }

    if (openBarberAutoChanged) {
      onChangePayload.openBarberAuto = openBarberAuto;
    }

    if (openQueueAutoChanged) {
      onChangePayload.openQueueAuto = openQueueAuto;
    }

    onChange(onChangePayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workDays, scheduleLimitDays, openBarberAuto, openQueueAuto]);

  return (
    <Collapse
      title="barber.servicesConfig.sections.general.title"
      subtitle="barber.servicesConfig.sections.general.subtitle">
      <SelectWorkDays workDays={workDays} onChange={handleWorkDaysChange} />
      <SelectScheduleLimit
        limit={scheduleLimitDays}
        onChange={handleScheduleLimitDaysChange}
      />
      <SwitchButton<boolean>
        value={openBarberAuto}
        onChange={handleOpenBarberAutoChange}
        label="barber.servicesConfig.fields.openBarberAuto"
        buttons={[
          {label: 'barber.servicesConfig.buttons.yes', value: true},
          {label: 'barber.servicesConfig.buttons.no', value: false},
        ]}
      />
      <SwitchButton<boolean>
        value={openQueueAuto}
        onChange={handleOpenQueueAutoChange}
        label="barber.servicesConfig.fields.openQueueAuto"
        buttons={[
          {label: 'barber.servicesConfig.buttons.yes', value: true},
          {label: 'barber.servicesConfig.buttons.no', value: false},
        ]}
      />
    </Collapse>
  );
};

export default ServiceGeneralConfigCard;
