import React, {useEffect, useMemo, useState} from 'react';

import {
  Collapse,
  SelectScheduleLimit,
  SelectWorkDays,
} from '@/components/atoms';

export interface IBarberServiceGeneralConfig {
  workDays: string[];
  scheduleLimitDays: number;
}

interface IServiceGeneralConfigCardProps {
  config: IBarberServiceGeneralConfig;
  onChange: (newConfig: IBarberServiceGeneralConfig, changed: boolean) => void;
}

const ServiceGeneralConfigCard: React.FC<IServiceGeneralConfigCardProps> = ({
  config,
  onChange,
}) => {
  const [workDays, setWorkDays] = useState(config.workDays);
  const [scheduleLimitDays, setScheduleLimitDays] = useState(
    config.scheduleLimitDays,
  );

  const handleWorkDaysChange = (newWorkDays: string[]) => {
    setWorkDays(newWorkDays);
  };

  const handleScheduleLimitDaysChange = (newScheduleLimitDays: number) => {
    setScheduleLimitDays(newScheduleLimitDays);
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

  useEffect(() => {
    onChange(
      {workDays, scheduleLimitDays},
      workDaysChanged || scheduleLimitDaysChanged,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workDays, scheduleLimitDays]);

  return (
    <Collapse
      title="barber.servicesConfig.sections.general.title"
      subtitle="barber.servicesConfig.sections.general.subtitle">
      <SelectWorkDays workDays={workDays} onChange={handleWorkDaysChange} />
      <SelectScheduleLimit
        limit={scheduleLimitDays}
        onChange={handleScheduleLimitDaysChange}
      />
    </Collapse>
  );
};

export default ServiceGeneralConfigCard;
