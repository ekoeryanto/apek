import Select from 'react-select';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const FASTYLES = this.props.field.get('type') || ['solid', 'brands', 'regular'];
export const Control = createClass({
  getInitialState() {
    return {
      style: this.props.field.get('default') || 'solid'
    };
  },
  getStyle: {
    solid: import('@fortawesome/fontawesome-free-solid'),
    brands: import('@fortawesome/fontawesome-free-brands'),
    regular: import('@fortawesome/fontawesome-free-regular'),
  },
  setOptions(style) {
    this.getStyle[style].then(({ default: icons }) => {
      fontawesome.library.add(icons);
      const options = Object.keys(icons).map(i => ({
        prefix: icons[i].prefix,
        name: icons[i].iconName,
      }));
      this.setState({ options });
    });
  },
  componentDidMount: function() {
    this.setOptions(this.state.style);
  },
  handleChange(option) {
    this.setState({selected: option})
    this.props.onChange(Object.values(option))
    console.log(this.props.value)
  },
  styleChange(e) {
    this.setState({ style: e.target.value });
    this.setOptions(e.target.value);
  },
  renderOption: function(option) {
    const icon = Object.values(option);
    return h(
      'div',
      null,
      h(FontAwesomeIcon, { icon, size: 'lg' }),
      h('span', { style: { marginLeft: 5 } }, option.name)
    );
  },
  renderValue: function(option) {
    const icon = Object.values(option);
    return h(
      'div',
      null,
      h(FontAwesomeIcon, { icon, size: 'lg' }),
      h('span', { style: { marginLeft: 5 } }, option.name)
    );
  },
  render: function() {
    return h(
      'div',
      { className: 'section' },
      h(Select, {
        labelKey: 'name',
        valueKey: 'name',
        options: this.state.options,
        optionRenderer: this.renderOption,
        onChange: this.handleChange,
        value: this.state.selected || this.props.value,
        valueRenderer: this.renderValue,
      }),
      h(
        'div',
        { className: 'hint' },
        FASTYLES.map(t =>
          h(
            'label',
            null,
            h('input', {
              checked: this.state.style === t,
              onChange: this.styleChange,
              type: 'radio',
              value: t,
            }),
            t
          )
        )
      )
    );
  },
});


export const Preview = createClass({
  render: function() {
    return h(FontAwesomeIcon, { icon: Object.values(this.props.value), size: 'lg' });
  },
});