import React from 'react';
import AutoComplete from '.';
import DomainSelectAutoCompleteFC from './components/DomainSelectAutoComplete';

const Component = React.forwardRef((props: { value: string, multi: boolean, onChange: (v: string) => void }, ref) => {
  const [value, setValue] = React.useState(props.value ?? '');
  return (
    <DomainSelectAutoCompleteFC
      ref={ref as any}
      height="34px"
      selectedKeys={value.split(',').map((i) => i.trim()).filter((i) => i)}
      onChange={(v) => {
        setValue(v);
        props.onChange(v);
      }}
      multi={props.multi}
    />
  );
});

export default class DomainSelectAutoComplete extends AutoComplete {
  static DOMAttachKey = 'ucwDomainSelectAutoCompleteInstance';

  constructor($dom, options) {
    super($dom, {
      classes: 'domain-select',
      ...options,
    });
  }

  attach() {
    const value = this.$dom.val();
    this.component.render(<Component
      ref={(ref) => { this.ref = ref; }}
      value={value}
      onChange={this.onChange}
      multi={this.options.multi}
    />);
  }
}

window.Hydro.components.DomainSelectAutoComplete = DomainSelectAutoComplete;
