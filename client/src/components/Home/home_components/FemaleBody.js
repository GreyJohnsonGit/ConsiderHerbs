import React from 'react';
import Female_Front from './images/Female_Front.png';
import Female_Front_Colored from './images/Female_Front_Colored.png';

const FemaleBodyFront = (props) => {

    //Not all of these body areas will be implemented. They are just mentioned so the body model can be scaled up if needed

    let FemaleHeadArea = "204.,  95., 220.,  83., 226.,  43., 222.,  25., 210.,  13., 197., 10., 185.,  13., 173.,  23., 168.,  44., 174.,  82., 190.,  96."
    let FemaleLEar = ""
    let FemaleREar = ""
    let FemaleMouthArea = ""
    let FemaleNeckArea = "169., 115., 228., 116., 215., 101., 216.,  88., 204.,  97., 191., 97., 179.,  89., 179., 102."
    let FemaleChestArea = "157., 111., 237., 110., 257., 149., 250., 185., 147., 187., 139., 148."
    let FemaleStomachArea = "150. , 210.17699115, 244.69026549, 210.17699115, 239.38053097, 242.47787611, 240.26548673, 254.42477876, 253.53982301, 289.82300885, 142.03539823, 289.82300885"
    let FemaleLArmArea = "164.60176991, 117.69911504, 139.82300885, 123.89380531,128.76106195, 134.95575221, 124.33628319, 152.65486726, 122.56637168, 186.72566372, 106.19469027, 235.84070796,100.44247788, 248.67256637,  94.24778761, 273.45132743, 86.28318584, 326.10619469,  99.55752212, 328.76106195,118.14159292, 280.97345133, 123.45132743, 267.25663717,129.6460177 , 237.61061947, 148.2300885 , 201.7699115 , 142.47787611, 185.39823009, 147.34513274, 158.40707965, 145.57522124, 150.88495575"
    let FemaleRArmArea = "231.4159292 , 117.25663717, 253.98230088, 123.45132743,264.15929204, 131.4159292 , 271.68141593, 149.55752212,273.89380531, 186.72566372, 289.82300885, 236.72566372,294.24778761, 242.92035398, 303.98230088, 292.03539823,309.2920354 , 324.77876106, 295.13274336, 326.99115044,273.00884956, 270.79646018, 265.92920354, 237.16814159,247.78761062, 201.7699115 , 253.53982301, 188.9380531 ,252.65486726, 177.43362832, 248.67256637, 158.40707965,249.11504425, 150.44247788"
    let FemaleLWristArea = ""
    let FemaleRWristArea = ""
    let FemaleLHandArea = ""
    let FemaleRHandArea = ""
    let FemaleArea = ""
    let FemaleBackArea = ""
    let FemaleLLeg = "192.03539823, 350., 134.51327434, 342.03539823,132.74336283, 354.42477876, 134.95575221, 382.74336283,147.78761062, 430.97345133, 155.30973451, 451.7699115 ,155.75221239, 473.89380531, 152.65486726, 506.19469027,167.69911504, 566.81415929, 182.74336283, 565.92920354,183.62831858, 533.18584071, 188.05309735, 500.44247788,182.74336283, 480.08849558, 188.05309735, 462.38938053,186.72566372, 430.08849558, 191.15044248, 385.39823009,193.80530973, 363.71681416"
    let FemaleRLeg = "202.65486726, 349.11504425, 260.61946903, 341.59292035,262.38938053, 367.25663717, 256.19469027, 400.88495575,245.57522124, 438.49557522, 240.26548673, 453.53982301,240.26548673, 475.66371681, 242.03539823, 496.90265487,238.49557522, 526.54867257, 229.6460177 , 563.27433628,212.38938053, 563.71681416, 212.38938053, 534.07079646,207.52212389, 500.44247788, 212.83185841, 480.53097345,207.07964602, 462.83185841, 209.73451327, 437.16814159,203.09734513, 383.62831858"
    let FemaleLKnee = ""
    let FemaleRKnee = ""
    let FemaleLFootArea = "167.25663717, 589.82300885, 184.51327434, 592.92035398,184.51327434, 611.50442478, 186.28318584, 621.23893805,183.62831858, 626.54867257, 182.74336283, 636.28318584,179.6460177 , 639.82300885, 170.3539823 , 638.05309735,157.07964602, 630.97345133, 157.52212389, 619.02654867,164.60176991, 603.09734513"
    let FemaleRFootArea = "210.17699115, 592.92035398, 228.31858407, 590.7079646 ,237.16814159, 617.69911504, 238.05309735, 630.53097345,224.33628319, 638.49557522, 213.71681416, 638.9380531 ,209.73451327, 620.79646018, 211.0619469 , 603.53982301"

    return (
        <div>
            <img src={props.image} width="400" useMap='#FFmap'></img>
            <map name="FFmap">
                <area shape="poly" coords={FemaleChestArea} onMouseOver={() => { console.log("Chest") }} onClick={() => { props.setFilterText("chest") }} />
                <area shape="poly" coords={FemaleNeckArea} onMouseOver={() => { console.log("Throat") }} onClick={() => { props.setFilterText("throat") }} />
                <area shape="poly" coords={FemaleHeadArea} onMouseOver={() => { console.log("Head") }} onClick={() => { props.setFilterText("head") }} />
                <area shape="poly" coords={FemaleStomachArea} onMouseOver={() => { console.log("Stomach") }} onClick={() => { props.setFilterText("stomach") }} />
                <area shape="poly" coords={FemaleLArmArea} onMouseOver={() => { console.log("Arm") }} onClick={() => { props.setFilterText("arm") }} />
                <area shape="poly" coords={FemaleRArmArea} onMouseOver={() => { console.log("Arm") }} onClick={() => { props.setFilterText("arm") }} />
                <area shape="poly" coords={FemaleLLeg} onMouseOver={() => { console.log("Leg") }} onClick={() => { props.setFilterText("leg") }} />
                <area shape="poly" coords={FemaleRLeg} onMouseOver={() => { console.log("Leg") }} onClick={() => { props.setFilterText("leg") }} />
                <area shape="poly" coords={FemaleLFootArea} onMouseOver={() => { console.log("Foot") }} onClick={() => { props.setFilterText("foot") }} />
                <area shape="poly" coords={FemaleRFootArea} onMouseOver={() => { console.log("Foot") }} onClick={() => { props.setFilterText("foot") }} />
            </map>
        </div>
    )
}
export default FemaleBodyFront;