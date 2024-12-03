import GarmentNameEditor from "@/components/GarmentNameEditor";
import ShirtPuppet from "@/components/puppet/Shirt";

/** @type {{ [K in GarmentType]: React.FC<PuppetProps<?>> }} */
const Puppets = {
  Shirt: ShirtPuppet,
  Pants: null, // TODO
};

/** @param {{ garment: GarmentInstance }} props */
const GarmentPuppet = (props) => {
  const { garment } = props;

  /** @type {ValueOf<Puppets>} */
  const Puppet = Puppets[garment?.type];

  return (
    <div className="garment-preview">
      <GarmentNameEditor />

      <div className="puppet-box">
        {Puppet && <Puppet specs={garment?.specMap()} />}
      </div>
    </div>
  );
};

export default GarmentPuppet;
