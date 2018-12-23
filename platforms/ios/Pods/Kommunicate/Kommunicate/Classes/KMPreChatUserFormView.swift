//
//  KMPreChatUserFormView.swift
//  Kommunicate
//
//  Created by Mukesh Thawani on 04/07/18.
//

import UIKit

class CircleView: UIView {

    override func draw(_ rect: CGRect) {
        guard let context = UIGraphicsGetCurrentContext() else {return}

        context.addEllipse(in: rect)
        var backgroundColor = UIColor(red: 92/255, green: 90/255, blue: 167/255, alpha: 1)
        backgroundColor = backgroundColor.withAlphaComponent(0.2)
        context.setFillColor(backgroundColor.cgColor)
        context.fillPath()
    }
}

class KMPreChatUserFormView: UIView {

    @IBOutlet var contentView: KMPreChatUserFormView!
    @IBOutlet weak var emailTextField: UITextField!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var phoneNumberTextField: UITextField!
    @IBOutlet weak var emailTitleLabel: UILabel!
    @IBOutlet weak var nameTitleLabel: UILabel!
    @IBOutlet weak var phoneNumberTitle: UILabel!
    @IBOutlet weak var sendInstructionsButton: UIButton!

    @IBOutlet weak var errorMessageLabel: UILabel!

    @IBOutlet weak var topStackView: UIStackView!

    @IBOutlet weak var topConstraint: NSLayoutConstraint!
    override init(frame: CGRect) {
        super.init(frame: frame)
        commonInit()
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    func commonInit() {
        Bundle.kommunicate.loadNibNamed("KMPreChatUserFormView", owner: self, options: nil)
        guard let contentView = contentView else {
            return
        }
        addSubview(contentView)
        contentView.frame = self.bounds
        contentView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
    }

    func setPlaceHolder(for textField: UITextField, withText text: String) {
        textField.attributedPlaceholder = placeholderWith(text: text)
    }

    func showErrorLabelWith(message: String) {
        errorMessageLabel.text = message
    }

    func hideErrorLabel() {
        errorMessageLabel.text = ""
    }

    private func placeholderWith(text: String) -> NSAttributedString {
        return NSAttributedString(string: text, attributes: [
            .foregroundColor: UIColor(173, green: 168, blue: 168),
            .font: UIFont(name: "HelveticaNeue-Medium", size: 16.0) ?? UIFont.systemFont(ofSize: 16.0)
            ])
    }
}
