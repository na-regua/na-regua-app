import React, {useEffect, useMemo, useState} from 'react';

import {IBarberServiceGeneralConfig} from '@/app/models';
import {
  Collapse,
  SelectScheduleLimit,
  SelectWorkDays,
  SwitchButton,
} from '@/components/atoms';

interface IServiceGeneralConfigCardProps {
  config: IBarberServiceGeneralConfig;
  onChange: (newConfig: Partial<IBarberServiceGeneralConfig>) => void;
}

const ServiceGeneralConfigCard: React.FC<IServiceGeneralConfigCardProps> = ({
  config,
  onChange,
}) => {
  const [workdays, setWorkdays] = useState(config.workdays);
  const [scheduleLimitDays, setScheduleLimitDays] = useState(
    config.schedule_limit_days,
  );
  const [openBarberAuto, setOpenBarberAuto] = useState(config.open_barber_auto);
  const [openQueueAuto, setOpenQueueAuto] = useState(config.open_queue_auto);

  const handleWorkDaysChange = (newWorkDays: string[]) => {
    setWorkdays(newWorkDays);
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
    if (workdays.length !== config.workdays.length) {
      return true;
    }

    const [bigger, smaller] =
      workdays.length > config.workdays.length
        ? [workdays, config.workdays]
        : [config.workdays, workdays];

    const hasDiff = bigger
      .map(day => smaller.includes(day))
      .some(item => !item);

    return hasDiff;
  }, [workdays, config.workdays]);

  const scheduleLimitDaysChanged = useMemo(
    () => scheduleLimitDays !== config.schedule_limit_days,
    [scheduleLimitDays, config.schedule_limit_days],
  );

  const openBarberAutoChanged = useMemo(
    () => openBarberAuto !== config.open_barber_auto,
    [openBarberAuto, config.open_barber_auto],
  );

  const openQueueAutoChanged = useMemo(
    () => openQueueAuto !== config.open_queue_auto,
    [openQueueAuto, config.open_queue_auto],
  );

  useEffect(() => {
    const onChangePayload: Partial<IBarberServiceGeneralConfig> = {};

    if (workDaysChanged) {
      onChangePayload.workdays = workdays;
    }

    if (scheduleLimitDaysChanged) {
      onChangePayload.schedule_limit_days = scheduleLimitDays;
    }

    if (openBarberAutoChanged) {
      onChangePayload.open_barber_auto = openBarberAuto;
    }

    if (openQueueAutoChanged) {
      onChangePayload.open_queue_auto = openQueueAuto;
    }

    onChange(onChangePayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workdays, scheduleLimitDays, openBarberAuto, openQueueAuto]);

  return (
    <Collapse
      title="barber.servicesConfig.sections.general.title"
      subtitle="barber.servicesConfig.sections.general.subtitle">
      <SelectWorkDays workDays={workdays} onChange={handleWorkDaysChange} />
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
