import React from'react';import{render,screen,waitFor}from'@testing-library/react';import App from'./App';
const data={city:'London',country:'GB',current:{temp:12,feelsLike:11,humidity:70,description:'cloudy',icon:'04d'},daily:[{date:'2026-09-28',min:8,max:14,description:'cloudy',icon:'04d'}]};
test('renders title',()=>{global.fetch=jest.fn(()=>new Promise(()=>{})) as any;render(<App/>);expect(screen.getByText('Weather, without the noise.')).toBeInTheDocument()});
test('loads weather after debounce',async()=>{global.fetch=jest.fn().mockResolvedValue({ok:true,json:async()=>data}) as any;render(<App/>);await waitFor(()=>expect(screen.getByText('London, GB')).toBeInTheDocument(),{timeout:1500})});
test('shows provider error',async()=>{global.fetch=jest.fn().mockResolvedValue({ok:false,json:async()=>({error:'City not found'})}) as any;render(<App/>);await waitFor(()=>expect(screen.getByText('City not found')).toBeInTheDocument(),{timeout:1500})});
