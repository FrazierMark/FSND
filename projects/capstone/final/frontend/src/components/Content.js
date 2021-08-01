import { useSpring, a } from "@react-spring/web";

export const Content = () => {
  const containerStyles = useSpring({
    from: { scaleX: 0 },
    to: { scaleX: 1 },
    delay: 300,
    config: { duration: 1000 }
  });

  const textStyles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1200,
    config: { duration: 1000 }
  });

  return (
    <a.div className="container" style={containerStyles}>
      <div className="content">
        <a.h1 style={textStyles}>
          See you on the
          <br /> flip side
        </a.h1>
        <a.p style={textStyles}>
          TES TEST TEST TEST TES
        </a.p>
        <form class="ui form">
            <div class="field">
                <label>First Name</label>
                <input placeholder="First Name"/>
                </div><div class="field">
                    <label>Last Name</label>
                    <input placeholder="Last Name"/>
                    </div><div class="field"><div class="ui checkbox">
                        <input type="checkbox" class="hidden" readonly="" tabindex="0"/>
                        <label>I agree to the Terms and Conditions</label>
                        </div></div>
                        <button type="submit" class="ui button">Submit</button></form>
      </div>
    </a.div>
  );
};
