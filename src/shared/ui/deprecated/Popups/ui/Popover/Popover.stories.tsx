import React, { useEffect } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Popover } from './Popover';
import { Button, ButtonTheme } from '../../../Button/Button';

export default {
  title: 'shared/deprecated/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <div style={{ padding: '100px' }}>
    <Popover {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  children: (
    <div style={{ padding: '15px' }}>
      <p>Содержимое всплывающего окна</p>
      <p>Может содержать любые компоненты и текст</p>
    </div>
  ),
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  direction: 'top left',
  children: (
    <div style={{ padding: '15px' }}>
      <p>Содержимое всплывающего окна</p>
      <p>Направление: вверх-влево</p>
    </div>
  ),
};

export const TopRight = Template.bind({});
TopRight.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  direction: 'top right',
  children: (
    <div style={{ padding: '15px' }}>
      <p>Содержимое всплывающего окна</p>
      <p>Направление: вверх-вправо</p>
    </div>
  ),
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  direction: 'bottom left',
  children: (
    <div style={{ padding: '15px' }}>
      <p>Содержимое всплывающего окна</p>
      <p>Направление: вниз-влево</p>
    </div>
  ),
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  direction: 'bottom right',
  children: (
    <div style={{ padding: '15px' }}>
      <p>Содержимое всплывающего окна</p>
      <p>Направление: вниз-вправо</p>
    </div>
  ),
};

export const WithComplexContent = Template.bind({});
WithComplexContent.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Показать информацию</Button>,
  children: (
    <div style={{
      padding: '15px',
      width: '250px',
      backgroundColor: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
    }}
    >
      <h3 style={{ margin: '0 0 10px 0' }}>Информация о пользователе</h3>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#eee',
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        >
          ИП
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>Иван Петров</div>
          <div style={{ fontSize: '12px', color: '#666' }}>Онлайн</div>
        </div>
      </div>
      <div style={{ fontSize: '14px', marginBottom: '10px' }}>
        <div>Email: user@example.com</div>
        <div>Роль: Администратор</div>
      </div>
      <Button theme={ButtonTheme.OUTLINE} style={{ width: '100%' }}>
        Просмотреть профиль
      </Button>
    </div>
  ),
};

export const OpenedByDefault: ComponentStory<typeof Popover> = (args) => {
  useEffect(() => {
    const triggerButton = document.querySelector('[class*="Trigger"]');
    if (triggerButton) {
      (triggerButton as HTMLElement).click();
    }
  }, []);

  return (
    <div style={{ padding: '100px' }}>
      <Popover {...args} />
    </div>
  );
};

OpenedByDefault.args = {
  trigger: <Button theme={ButtonTheme.OUTLINE}>Открыть попап</Button>,
  children: (
    <div style={{ padding: '15px' }}>
      <p>Этот поповер открыт по умолчанию</p>
    </div>
  ),
};
